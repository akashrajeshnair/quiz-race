import CreateQuizForm from "../(components)/CreateQuizForm/CreateQuizForm";
import ProtectedRoute from "../(components)/ProtectedRoutes/ProtectedRoutes"

export default function CreateQuiz() {
    return (
      <div>
        <ProtectedRoute>
          <CreateQuizForm></CreateQuizForm>
        </ProtectedRoute>
      </div>
    );
  }