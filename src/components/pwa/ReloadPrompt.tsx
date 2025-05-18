import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`);
      if (r) {
        setInterval(() => {
          console.log('Checking for sw update');
          void r.update();
        }, 60000); // Check for updates every minute
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) {
    return <div className="w-0 h-0 overflow-hidden" />;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col">
      <div className="bg-white border border-gray-200/50 rounded-lg shadow-lg p-4 max-w-sm transition-all duration-300 ease-in-out">
        <div className="mb-3 font-medium">
          {offlineReady ? (
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>App ready to work offline</span>
            </div>
          ) : (
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>New content available, click to update</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {needRefresh && (
            <button
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
              onClick={() => void updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 rounded text-sm transition-colors"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReloadPrompt;
