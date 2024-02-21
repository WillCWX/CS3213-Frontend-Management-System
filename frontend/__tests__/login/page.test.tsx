import '@testing-library/jest-dom'
import { act, fireEvent, render, screen} from '@testing-library/react'
import Home from '../../src/app/login/page'
 
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));




describe('Login Snapshot tests', () => {
  it('renders login unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})

describe('Email Input tests', () => {
    const emailErrorMessage = "Please enter a valid email";

    it('renders email input', () => {
        const emailInput = render(<Home />).getByLabelText("Email");
        expect(emailInput).toBeInTheDocument();
    })
    it('no error on zero email input', () => {
        const emailError = render(<Home />).queryByText(emailErrorMessage);
        expect(emailError).not.toBeInTheDocument();
    })
    it('error on bad email input', () => {
      const {queryByText, getByLabelText} = render(<Home />)
      
      const emailInput = getByLabelText("Email");
      fireEvent.change(emailInput, { target: { value: 'bad' }});
      const emailError = queryByText(emailErrorMessage);
      expect(emailError).toBeInTheDocument();
    })
    it('error gone on good email input', () => {
      const {queryByText, getByLabelText} = render(<Home />)
      
      const emailInput = getByLabelText("Email");
      fireEvent.change(emailInput, { target: { value: 'bad' }});
      var emailError = queryByText(emailErrorMessage);
      expect(emailError).toBeInTheDocument();
      fireEvent.change(emailInput, { target: { value: 'good@email.com' }});
      emailError = queryByText(emailErrorMessage);
      expect(emailError).not.toBeInTheDocument();
    })
})

describe('Password Input tests', () => {
  it('renders password input', () => {
    const passwordInput = render(<Home />).getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
  })
})


describe("Login button test", () => {

  const loginErrorMessage = "Invalid Email/Password";
  const serverDownMessage = "We are currently encountering some issues, please try again later";

  it('renders login button', () => {
    const loginButton = render(<Home />).getByText("Login");
    expect(loginButton).toBeInTheDocument();
  })

  it('error when no credentials given', async() => {
    const {getByText, findByRole, getByLabelText} = render(<Home />)

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Login");

    
    act(() => {
      fireEvent.click(loginButton)
    });

    const errorMessage = await findByRole("alertdialog");
    expect(errorMessage).toBeInTheDocument();
  })

  it('error when server is down', async () => {
    global.fetch =  jest.fn(
      () => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}), 
      }), 
    ) as jest.Mock 

    const {getByText, findByRole, getByLabelText} = render(<Home />)

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: 'normal@email.com' }});
    fireEvent.change(passwordInput, { target: { value: '12345678910' }});
    act(() => {
      fireEvent.click(loginButton)
    });
    expect(fetch).toHaveBeenCalled();
    const errorMessage = await findByRole("alertdialog");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(serverDownMessage);
  })

  it('error when credentials are invalid', async () => {
    global.fetch =  jest.fn(
        () => Promise.resolve({ ok: false, status: 401, json: () => Promise.resolve({}), 
        }), 
    ) as jest.Mock 
  
    const {getByText, findByRole, getByLabelText} = render(<Home />)

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: 'normal@email.com' }});
    fireEvent.change(passwordInput, { target: { value: '12345678910' }});
    act(() => {
      fireEvent.click(loginButton)
    });
    expect(fetch).toHaveBeenCalled();
    const errorMessage = await findByRole("alertdialog");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(loginErrorMessage);
  })
})