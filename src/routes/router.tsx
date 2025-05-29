import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useResolver } from "@/hooks/useResolver";

/* ------Pages--------- */
import { authRoutes } from "@/modules/auth/AuthRoutes";
import { statusRoutes } from "@/modules/status/StatusRoutes";
import ShouldBeLogged from "@/middlewares/ShouldBeLogged";
import { SplashPage } from "@/pages/SplashPage";
import { Suspense } from "react";
import { profileRoutes } from "@/modules/profile/ProfileRoutes";
import { PractitionerRoutes } from "@/modules/practitioner/PractitionerRoutes";
import { clinicsRoutes } from "@/modules/clinics/ClinicsRoutes";
import { PatientsRoutes } from "@/modules/patients/PatientsRoutes";
import { rolesRoutes } from "@/modules/roles/RolesRoutes";
import { organizationRoutes } from "@/modules/organization/OrganizationRoutes";
import { healthCareRoutes } from "@/modules/healthCare/HealthCareRoutes";
import { healthCareEligibiltyRoutes } from "@/modules/healthCareEligibilty/HealthCareEligibiltyRoutes";
import { appointmentsRoutes } from "@/modules/appointments/AppointmentsRoutes";
import { showMyClinicRoutes } from "@/modules/ShowMyClinic/ShowMyClinicRoutes";
import { showMyAppointmentsRoutes } from "@/modules/ShowMyAppointments/ShowMyAppointmentsRoutes";
import { observationDefinitionsRoutes } from "@/modules/observationDefinitions/ObservationDefinitionsRoutes";
// IMPORT PAGES
// ⚠️ WARNING: don't remove {{IMPORT PAGES}} comment , it used to generate routes here

const DashboardWithResolver = () => {
  const { appReady } = useResolver();

  if (!appReady) {
    return <SplashPage />;
  }

  return <DashboardLayout />;
};

export const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <ShouldBeLogged>
          <Suspense fallback={<SplashPage />}>
            <DashboardWithResolver />
          </Suspense>
        </ShouldBeLogged>
      ),
      children: [
        // Dashboard Routers
        // ⚠️ WARNING: don't remove {{Dashboard Routers}} comment , it used to generate routes here

        ...profileRoutes,
        ...PractitionerRoutes,
        ...clinicsRoutes,
        ...PatientsRoutes,
        ...rolesRoutes,
        ...organizationRoutes,
        ...healthCareRoutes,
        ...healthCareEligibiltyRoutes,
        ...appointmentsRoutes,
        ...showMyClinicRoutes,
        ...showMyAppointmentsRoutes,
        ...observationDefinitionsRoutes,
      ],
    },
    ...authRoutes,
    ...statusRoutes,
  ]);
