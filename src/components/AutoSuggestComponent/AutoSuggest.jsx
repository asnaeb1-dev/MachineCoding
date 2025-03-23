import "./AutoSuggest.css";

const AutoSuggest = () => {
  return (
    <div className="autoSuggestMain">
      <h1>AutoSuggest / AutoType</h1>
      <div className="autosuggestbox">
        <input className="input-text" />
        <div className="suggestions">

        </div>
      </div>
    </div>
  );
};

export default AutoSuggest;
