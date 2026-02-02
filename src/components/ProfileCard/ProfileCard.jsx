import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

const DEFAULT_BEHIND_GRADIENT =
  "linear-gradient(120deg,#00f2ff,#faff00,#ff00cc)";

const DEFAULT_INNER_GRADIENT =
  "radial-gradient(circle at top,rgba(255,255,255,.25),rgba(0,0,0,.9) 70%)";

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);

const ProfileCard = ({
  avatarUrl,
  name = "Ni'am Mawahib",
  title = "Web Developer",
  handle = "niammwhb.",
  status = "Online",
  contactText = "Contact Me",
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const onMove = useCallback((e) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const r = card.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100);

    wrap.style.setProperty("--pointer-x", `${x}%`);
    wrap.style.setProperty("--pointer-y", `${y}%`);
    wrap.style.setProperty("--rotate-x", `${(50 - y) / 4}deg`);
    wrap.style.setProperty("--rotate-y", `${(x - 50) / 4}deg`);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pc-card-wrapper"
      style={{
        "--behind-gradient": DEFAULT_BEHIND_GRADIENT,
        "--inner-gradient": DEFAULT_INNER_GRADIENT,
      }}
    >
      <section
        ref={cardRef}
        className="pc-card"
        onMouseMove={onMove}
        onMouseEnter={() => wrapRef.current.classList.add("active")}
        onMouseLeave={() => wrapRef.current.classList.remove("active")}
      >
        <div className="pc-inside">
          <div className="pc-shine" />
          <div className="pc-glare" />

          <div className="pc-content pc-avatar-content">
            <img className="avatar" src={avatarUrl} alt="doscom.png" />
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className="pc-mini-avatar">
                  <img src={avatarUrl} alt="mini" />
                </div>
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status">{status}</div>
                </div>
              </div>
              <button className="pc-contact-btn" onClick={onContactClick}>
                {contactText}
              </button>
            </div>
          </div>

          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileCard;
