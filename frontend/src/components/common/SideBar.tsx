"use client";

import { useState } from "react";
import { Avatar, Button, User, Spacer } from "@nextui-org/react";
import { HiOutlineChevronDoubleLeft, HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {
  MdOutlineAssignment,
  MdOutlineUploadFile,
  MdOutlineLogout,
} from "react-icons/md";
import classNames from "classnames";

const menuItems = [
  {
    id: 1,
    label: "Assignments",
    icon: <MdOutlineAssignment className="text-2xl" />,
    link: "/assignments/dashboard",
  },
  {
    id: 2,
    label: "Submissions",
    icon: <MdOutlineUploadFile className="text-2xl" />,
    link: "/assignments/submissions",
  },
];

const SideBar = () => {
  const router = useRouter();
  const userName = "Jane Doe";
  const userEmail = "janedoe@u.nus.edu";
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-lightgrey text-black flex flex-col",
    {
      ["w-60"]: !isCollapsed,
      ["w-20"]: isCollapsed,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigate = (route: any) => {
    router.push(route);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
    >
      <div className="flex flex-col relative">
        <div className="flex items-center pl-1 gap-4">
          {isCollapsed ? (
            <div className="block">
              <Button
                isIconOnly
                onClick={handleToggleCollapse}
                className="text-black"
              >
                <HiMenu className="text-2xl" />
              </Button>
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Spacer y={60} />
              {menuItems.map((item: any) => (
                <Button
                  isIconOnly
                  key={item.id}
                  // onClick={handleToggleCollapse}
                  className="text-black"
                  onPress={() => handleNavigate(item.link)}
                >
                  {item.icon}
                </Button>
              ))}
              <Spacer y={72} />
              <Spacer y={6} />
              <Button
                isIconOnly
                // onClick={handleToggleCollapse}
                className="text-black"
              >
                <MdOutlineLogout className="text-2xl" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col w-full items-start">
              <Button
                isIconOnly
                onClick={handleToggleCollapse}
                className="text-black"
              >
                <HiOutlineChevronDoubleLeft className="text-2xl" />
              </Button>
              <User
                name={userName}
                description={userEmail}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
              <Spacer y={60} />
              {menuItems.map((item: any) => (
                <Button
                  // isIconOnly
                  // onClick={handleToggleCollapse}
                  key={item.id}
                  className="flex text-black text-left items-center justify-start p-2"
                  fullWidth={true}
                  startContent={item.icon}
                  onPress={() => handleNavigate(item.link)}
                >
                  {item.label}
                </Button>
              ))}
              <Spacer y={72} />
              <Spacer y={6} />
              <Button
                // isIconOnly
                // onClick={handleToggleCollapse}
                className="flex text-black w-full text-left items-center justify-start p-2"
                fullWidth={true}
                startContent={<MdOutlineLogout className="text-2xl" />}
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;


// "use client";

// import { useState } from "react";
// import { Avatar, Button, User } from "@nextui-org/react";
// import { HiOutlineChevronDoubleLeft, HiMenu } from "react-icons/hi";
// import classNames from "classnames";

// const SideBar = () => {
//   const userName = "Jane Doe";
//   const userEmail = "janedoe@u.nus.edu";
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isCollapsible, setIsCollapsible] = useState(false);

//   const wrapperClasses = classNames(
//     "px-4 pt-8 pb-4 bg-gray-200 text-black flex justify-between flex-col border border-dashed",
//     {
//       ["w-60"]: !isCollapsed,
//       ["w-20"]: isCollapsed,
//     }
//   );

//   const collapseIconClasses = classNames(
//     "p-4 rounded bg-gray-300 absolute right-0",
//     { "rotate-180": isCollapsed }
//   );

//   const onMouseOver = () => {
//     setIsCollapsible(!isCollapsible);
//   };

//   const handleToggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div
//       className={wrapperClasses}
//       onMouseEnter={onMouseOver}
//       onMouseLeave={onMouseOver}
//     >
//       <div className="flex flex-col relative">
//         <div className="flex items-center pl-1 gap-4">
//           {isCollapsed ? (
//             <div className="block">
//               <Button
//                 isIconOnly
//                 onClick={handleToggleCollapse}
//                 className="text-black shadow-lg"
//               >
//                 <HiMenu className="text-2xl" />
//               </Button>
//               <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
//             </div>
//           ) : (
//             <User
//               name={userName}
//               description={userEmail}
//               avatarProps={{
//                 src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//               }}
//             />
//           )}
//         </div>
//         {!isCollapsed && isCollapsible && (
//           <Button
//             isIconOnly
//             onClick={handleToggleCollapse}
//             className="text-black shadow-lg absolute right-0"
//           >
//             <HiOutlineChevronDoubleLeft className="text-2xl" />
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SideBar;

