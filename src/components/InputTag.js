import React, { useState } from "react";
import "./styles/InputTag.scss";

function InputTag({ details, setDetails }) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);

  const removeTag = (e) => {
    e.preventDefault();
    const tagsCopy = [...tags];
    const poppedTag = tagsCopy.pop();
    setTags(tagsCopy);
    setDetails({ ...details, tags: tagsCopy });
    setInput(poppedTag);
  };

  const inputKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key == "," && trimmedInput.length && !tags.includes(trimmedInput)) ||
      (key == "Tab" && trimmedInput.length && !tags.includes(trimmedInput))
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setDetails({ ...details, tags: tags });
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setDetails({ ...details, tags: tagsCopy });
      setInput(poppedTag);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <div className="input-tag">
      <ul className="input-tag__tags">
        {tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={removeTag}>
              +
            </button>
          </li>
        ))}
        <li className="input-tag__tags__input">
          <input
            type="text"
            onKeyDown={inputKeyDown}
            value={input}
            onChange={handleChange}
          />
        </li>
      </ul>
    </div>
  );
}

export default InputTag;
