const CustomNetwork = () => {
  return (
    <div className="flex items-center gap-1 font-bold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2c3e50"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M14 10a2 2 0 1 0 -4 0v4a2 2 0 1 0 4 0" />
      </svg>
      Custom Network
    </div>
  );
};

export default CustomNetwork;
