export const PagesRoutes = {
  auth: {
    login: {
      path: "/auth/login",
    },
  },
  home: {
    path: "/",
  },
  profile: {
    path: "/profile/info",
    children: {
      update: {
        path: "/profile/info/update",
      },
      telecoms: {
        path: "/profile/telecoms",
      },
    },
  },
  organization: {
    path: "/organization",
    children: {},
  },
  practitioner: {
    path: "/practitioners",
    children: {
      create: {
        path: "/practitioners/create",
      },
      show: {
        path: "/practitioners/show",
      },
    },
  },
  clinics: {
    path: "/clinics",
    children: {},
  },
  patients: {
    path: "/patients",
    children: {
      show: {
        path: "/patients/show",
      },
      update: {
        path: "/patients/update",
      },
    },
  },
  roles: {
    path: "/roles",
    children: {},
  },
  healthCare: {
    path: "/health-care",
    children: {
      create: {
        path: "/health-care/create",
      },
      update: {
        path: "/health-care/update",
      },
      show: {
        path: "/health-care/show",
      },
    },
  },
  healthCareEligibilty: {
    path: "/health-care-eligibilty",
    children: {},
  },
  appointments: {
    path: "/appointments",
    children: {
      show: {
        path: "/appointments/show",
      },
      create: {
        path: "/appointments/create",
      },
    },
  },
  showMyClinic: {
    path: "/show-my-clinic",
    children: {},
  },
  showMyAppointments: {
    path: "/show-my-appointments",
    children: {},
  },
  observationDefinitions: {
    path: "/observation-definitions",
    children: {
      create: {
        path: "/observation-definitions/create",
      },
      update: {
        path: "/observation-definitions/update",
      },
      show: {
        path: "/observation-definitions/show",
      },
      createAualifiedValues: {
        path: "/qualified-values/create",
      },
      updateAualifiedValues: {
        path: "/qualified-values/update",
      },
    },
  },
};
