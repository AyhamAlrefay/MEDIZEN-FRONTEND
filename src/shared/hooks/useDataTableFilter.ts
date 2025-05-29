import { useSearchParams } from "react-router-dom"
import { GridPaginationModel } from "@mui/x-data-grid";


export const useDataTableFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationModel = {
    page: Number(searchParams.get("pagination[page]")),
    pageSize: Number(searchParams.get("pagination[limit]")) > 0 ? Number(searchParams.get("pagination[limit]")) : 10,
  }

  const filter = JSON.parse(searchParams.get("filter")?.toString() ?? "{}");

  const onPaginationModelChange = (model: GridPaginationModel) => setSearchParams((params) => {
    params.set("pagination[page]", model.page.toString())
    params.set("pagination[limit]", model.pageSize.toString())
    return params
  }, { replace: true })

  const onFilter = (k: string, v: string) => {

    setSearchParams((params) => {
      params.set("filter", JSON.stringify({ ...filter, [k]: v }))
      params.set("pagination[page]", "0",)
      return params
    }, { replace: true })
  }






  return { paginationModel, onPaginationModelChange, filter, onFilter }
}