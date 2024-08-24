function Home() {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-16 pb-10 pt-2">
        <h1 className="text-2xl font-bold font-spaceGrotesk">Welcome</h1>
        <button
          onClick={handleLogout}
          className="button text-white"
        >
          Logout
        </button>
      </header>
      <div className="flex-grow overflow-hidden">
        <iframe
          src="http://localhost:8888"
          className="w-full h-full border-none"
          title="Jupyter Notebook"
        />
      </div>
    </div>
  );
}

export default Home;
