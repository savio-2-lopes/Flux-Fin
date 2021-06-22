import React from 'react';
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as Io5Icons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    path: "/",
    icon: <RiIcons.RiArrowLeftCircleFill />,
    cName: 'nav-text'
  },
  {
    path: "/",
    icon: <MdIcons.MdDashboard />,
    cName: 'nav-text'
  },
  {
    path: "/",
    icon: <CgIcons.CgMenuGridR />,
    cName: 'nav-text'
  },
  {
    path: "/",
    icon: <Io5Icons.IoToggleOutline />,
    cName: 'nav-text'
  },
  {
    path: "/",
    icon: <Io5Icons.IoHelpCircleOutline />,
    cName: 'nav-text-help'
  },
  {
    path: "/",
    icon: <MdIcons.MdQuestionAnswer />,
    cName: 'nav-text-answer'
  }
]

export default SidebarData;