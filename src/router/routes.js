const routes = [
  { path: "", redirect: "/inspections" },
  {
    path: "/inspections",

    component: () => import("../views/RouterTemplate.vue"),
    children: [
      {
        path: "",
        name: "InspectionList",
        meta: {
          requiresAuth: true,
          title: "Inspections",
          layout: "admin",
          base: true,
        },
        component: () => import("../views/InspectionList.vue"),
        props: (route) => ({ query: route.query.q }),
      },
      {
        path: "create",
        component: () => import("../views/RouterTemplate.vue"),
        children: [
          {
            path: "",
            name: "InspectionCreate",
            meta: {
              requiresAuth: true,
              layout: "admin",
              title: "Inspection Create Page",
            },
            component: () => import("../views/InspectionCreate.vue"),
          },
          {
            path: ":slug",
            name: "InspectionCreateChecklist",
            props: true,
            meta: { requiresAuth: true, layout: "admin" },
            component: () => import("../views/InspectionCreateChecklist.vue"),
          },
        ],
      },
      {
        path: ":uuid",
        name: "InspectionDetail",
        meta: {
          requiresAuth: true,
          layout: "admin",
          title: "Inspection Detail Page",
        },
        props: true,
        component: () => import("../views/InspectionDetail.vue"),
      },
    ],
  },

  {
    path: "/checklists",
    component: () => import("../views/RouterTemplate.vue"),
    children: [
      {
        path: "",
        name: "Checklists",
        meta: {
          requiresAuth: true,
          title: "Checklists",
          layout: "admin",
          base: true,
        },
        component: () => import("../views/Checklists.vue"),
      },
      {
        path: ":slug",
        name: "ChecklistDetail",
        props: true,
        meta: {
          requiresAuth: true,
          title: "Checklist Detail",
          layout: "admin",
        },
        component: () => import("../views/ChecklistDetail.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    meta: { layout: "blank" },
    component: () => import("../views/Login.vue"),
  },
];

export default routes;
