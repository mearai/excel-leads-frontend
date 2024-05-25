import { uniqueId } from "lodash";

import { IconShoppingCart, IconAperture } from "@tabler/icons-react";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Leads",
    icon: IconAperture,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Stats",
    icon: IconShoppingCart,
    href: "/stats",
  },
];

export default Menuitems;
