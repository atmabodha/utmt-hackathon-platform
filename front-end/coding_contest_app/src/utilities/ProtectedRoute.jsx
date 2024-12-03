import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user';
import LoadingOverlay from 'react-loading-overlay-ts';
import PulseLoader from 'react-spinners/PulseLoader';

const ProtectedRoute = ({ children }) => {
  const { current: user, loading } = useUser();

  if (loading) {
    return (
      <LoadingOverlay
        active={loading}
        text="Please wait while we fetch. It will not take more than a few seconds"
        spinner={
          <PulseLoader
            color="var(--text-color)"
            loading={true}
            size={15}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        {/* Optionally, you can include a fallback UI while loading */}
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Loading content...
        </div>
      </LoadingOverlay>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
