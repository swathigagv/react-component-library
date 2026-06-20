import Accordion from "./components/Accordion/Accordion";
import reactQuestions from "./data/reactQuestions";

export default function App() {
  return (
    <>
     <h1 style={{ textAlign: "center" , marginTop: "20px" }}>
      React Interview Questions Accordion</h1>
      <Accordion data={reactQuestions} />
    </>
  );
}
