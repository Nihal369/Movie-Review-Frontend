import "./EmptyState.css";

const EmptyState = ({
  message = "No data found",
}) => {
  return (
    <div className="empty-state">
      {message}
    </div>
  );
};

export default EmptyState;