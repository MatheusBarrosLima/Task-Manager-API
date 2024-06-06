import { Container } from "./styles";

type MenuTypes = {
  title: string;
  icon: string;
  onClick?: () => void;
};

export function MenuItem({ title, icon, onClick }: MenuTypes) {
  return (
    <Container onClick={onClick}>
      <i className="material-icons">{icon}</i>
      <span>{title}</span>
    </Container>
  );
}
