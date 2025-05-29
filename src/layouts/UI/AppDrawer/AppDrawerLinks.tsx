import { PagesRoutes } from "@/constants";
import { NavItem } from "@/types";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Groups2Icon from "@mui/icons-material/Groups2";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CodeIcon from "@mui/icons-material/Code";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Actions, Subjects, SubjectToActions } from "@/can/permissions";
import ScienceIcon from "@mui/icons-material/Science";

export const NavbarList: NavItem[] = [
  {
    link: PagesRoutes.practitioner.path,
    label: "Practitioner",
    icon: <PeopleIcon />,
    action:
      SubjectToActions[Subjects.PRACTITIONER_MANAGEMENT][
        Actions.VIEW_PRACTITIONERS
      ],
  },
  {
    link: PagesRoutes.clinics.path,
    label: "Clinics",
    icon: <MedicalServicesIcon />,
    action: SubjectToActions[Subjects.CLINIC_MANAGEMENT][Actions.VIEW_CLINICS],
  },
  {
    link: PagesRoutes.patients.path,
    label: "Patients",
    icon: <Groups2Icon />,
    action:
      SubjectToActions[Subjects.PATIENT_MANAGEMENT][Actions.VIEW_PATIENTS],
  },
  {
    link: PagesRoutes.healthCare.path,
    label: "Health Care Services",
    icon: <HealthAndSafetyIcon />,
    action:
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.VIEW_HEALTH_CARE_SERVICES
      ],
  },
  {
    link: PagesRoutes.healthCareEligibilty.path,
    label: "Health Care Eligibilty",
    icon: <CodeIcon />,
    action:
      SubjectToActions[Subjects.HEALTHCARE_SERVICE_MANAGEMENT][
        Actions.VIEW_HEALTH_CARE_SERVICE_ELIGIBILITIES
      ],
  },
  {
    link: PagesRoutes.appointments.path,
    label: "Appointments",
    icon: <EventNoteIcon />,
    action:
      SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
        Actions.VIEW_APPOINTMENTS
      ],
  },
  {
    link: PagesRoutes.showMyClinic.path,
    label: "My CLinic",
    icon: <MedicalServicesIcon />,
    action:
      SubjectToActions[Subjects.CLINIC_MANAGEMENT][Actions.VIEW_MY_CLINIC],
  },
  {
    link: PagesRoutes.roles.path,
    label: "Roles",
    icon: <AdminPanelSettingsIcon />,
    action:
      SubjectToActions[Subjects.ROLE_PERMISSIONS_MANAGEMENT][
        Actions.VIEW_ROLES
      ],
  },
  {
    link: PagesRoutes.showMyAppointments.path,
    label: "My Appointments",
    icon: <EventNoteIcon />,
    action:
      SubjectToActions[Subjects.APPOINTMENT_MANAGEMENT][
        Actions.VIEW_MY_APPOINTMENTS
      ],
  },
  {
    link: PagesRoutes.observationDefinitions.path,
    label: "Observation Definitions",
    icon: <ScienceIcon />,
    action:
      SubjectToActions[Subjects.OBSERVATION_MANAGEMENT][
        Actions.VIEW_OBSERVATION_DEFINITIONS
      ],
  },
];
