import { styled } from "@mui/material/styles";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const StyledDiv = styled("div")(({ theme }) => ({
  background: `${theme.palette.primary.main} !important`,
}));

export const PointsLoader = (p: DivProps) => {
  return (
    <div className="lds-ellipsis" {...p}>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
    </div>
  );
};
