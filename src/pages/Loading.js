import loadingAni from "../loading.svg";

const Loading = () => {
  return (
    <div className="loading__container">
      <div className="loading">
        <img src={loadingAni} alt="" />
        <span>Sedang Memuat Data...</span>
      </div>
    </div>
  );
};

export default Loading;
