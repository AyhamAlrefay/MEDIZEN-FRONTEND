// create your dashboard generators here

export default (plop) => {
  plop.setGenerator("crud", {
    description: "generate crud",
    prompts: [
      {
        type: "input",
        name: "routerName",
        message: "router name please",
      },
      {
        type: "input",
        name: "name",
        message: "module name please",
      },
      {
        type: "input",
        name: "serviceName",
        message: "service name please",
      },
      {
        type: "input",
        name: "endPoint",
        message: "Enter endPoint name",
      },
    ],
    actions: () => {
      const currentPath = process.cwd();

      return [
        /* Add Index Page */
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/pages/{{pascalCase name}}Index.tsx",
          templateFile: "plop-templates/crud/index.hbs",
        },
        /* Add Create Page */

        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/pages/{{pascalCase name}}Create.tsx",
          templateFile: "plop-templates/crud/create.hbs",
        },
        /* Add Update Page */

        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/pages/{{pascalCase name}}Update.tsx",
          templateFile: "plop-templates/crud/update.hbs",
        },
        /* Add Details Page */

        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/pages/{{pascalCase name}}Details.tsx",
          templateFile: "plop-templates/crud/one.hbs",
        },
        /* Add Details Page */

        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/{{pascalCase name}}Component.tsx",
          templateFile: "plop-templates/crud/CrudComponent.hbs",
        },
        /* Add Page Routes */

        {
          type: "add",
          path:
            currentPath + "/src/modules/{{name}}/{{pascalCase name}}Routes.tsx",
          templateFile: "plop-templates/crud/CrudRoutes.hbs",
        },
        /* Add Components Folder */

        {
          type: "add",
          path: currentPath + "/src/modules/{{name}}/components/index.ts",
          templateFile: "plop-templates/module/components/index.hbs",
        },
        /* Add Service */
        {
          type: "add",
          path:
            currentPath +
            "/src/services/{{serviceName}}/{{serviceName}}.service.ts",
          templateFile: "plop-templates/service/service.hbs",
        },
        /* Add Types */
        {
          type: "add",
          path:
            currentPath +
            "/src/services/{{serviceName}}/{{serviceName}}.types.ts",
          templateFile: "plop-templates/service/service.types.hbs",
        },
        /* Create Table */
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/components/{{pascalCase name}}Table/index.tsx",
          templateFile: "plop-templates/DataTable/DataTable.hbs",
        },
        /* Create Table Filter*/
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/components/{{pascalCase name}}Table/{{pascalCase name}}TableFilter.tsx",
          templateFile: "plop-templates/DataTable/filter.hbs",
        },
        /* Create hooks */
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/hooks/use{{pascalCase name}}Columns.tsx",
          templateFile: "plop-templates/DataTable/useColumns.hbs",
        },
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/hooks/useCreate{{pascalCase name}}.ts",
          templateFile: "plop-templates/crud/useCreate.hbs",
        },
        {
          type: "add",
          path:
            currentPath +
            "/src/modules/{{name}}/hooks/useUpdate{{pascalCase name}}.ts",
          templateFile: "plop-templates/crud/useUpdate.hbs",
        },

        /* Create helpers for module */
        {
          type: "add",
          path: currentPath + "/src/modules/{{name}}/helper/{{name}}Schema.ts",
          templateFile: "plop-templates/helper/validation.hbs",
        },
        {
          type: "add",
          path:
            currentPath + "/src/modules/{{name}}/helper/{{name}}Serializer.ts",
          templateFile: "plop-templates/helper/serializer.hbs",
        },

        /* Add the route to router */
        {
          path: currentPath + "/src/routes/router.tsx",
          pattern: /(\/\/ Dashboard Routers)/g,
          template: "...{{name}}Routes,\n$1",
          type: "modify",
        },
        {
          path: currentPath + "/src/routes/router.tsx",
          pattern: /(\/\/ IMPORT PAGES)/g,
          template:
            "//--------{{pascalCase name}} Routes--------- \nimport { {{name}}Routes } from '@/modules/{{name}}/{{pascalCase name}}Routes';\n$1",
          type: "modify",
        },

        /* Add the route to sidebar */
        {
          path: currentPath + "/src/layouts/UI/AppDrawer/AppDrawerContent.tsx",
          pattern: /(\{\/\* IMPORT SIDEBAR ITEM \*\/\})/g,
          template:
            "<AppDrawerBootstrapItem setDrawerOpen={setDrawerOpen} to={'{{routerName}}'} Icon={<DashboardIcon />} drawerOpen={drawerOpen} label={'{{name}}'}/>\n$1",
          type: "modify",
        },

        /* Add interceptor if there is no interceptor before */
        // {
        //   type: "add",
        //   path: currentPath + "/src/services/interceptor.ts",
        //   templateFile: "plop-templates/service/interceptor.hbs",
        // },
      ];
    },
  });
  plop.setGenerator("tableColumns", {
    description: "generate service",
    prompts: [
      {
        type: "input",
        name: "moduleName",
        message: "module name please",
      },
      {
        type: "input",
        name: "columns",
        message: "columns  please",
      },
    ],
    actions: (data) => {
      const columnsArray = data.columns.split(",").map((col) => col.trim()); // Split the input into an array of columns
      const columnElements = columnsArray
        .map(
          (column, index) =>
            `{ field: '${column}', headerName:'${column}',flex:1 }`,
        )
        .join(",\n");
      return [
        {
          path: "./src/modules/{{moduleName}}/hooks/use{{pascalCase moduleName}}Columns.tsx",
          pattern: /(\/\/ COLUMNS)/g,
          template: `
                    
                        ${columnElements}
                    ,
                    $1`,
          type: "modify",
        },
      ];
    },
  });
};
