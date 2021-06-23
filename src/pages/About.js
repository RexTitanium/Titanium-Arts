import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import "./styles/about.scss";
function About({ banner, setLoc }) {
  useEffect(() => {
    setLoc(2);
  });
  return (
    <div className="about-container">
      <div className="header-container">
        <img className="header-image" src={banner} alt="backdrop" />
        <div className="header-text">
          <h1>ABOUT</h1>
        </div>

        <div className="empty"></div>
      </div>

      <div className="about">
        <div className="personal-info">
          <h1>Who am I?</h1>

          <Paper className="paper1" elevation={6}>
            <p>
              I am an Engineering Student, currently studying at D.J. Sanghvi
              College of Engineering, Mumbai. I am an intermediate ReactJs
              developer and currently learning AI/ML. I am creatively skilled
              which helped me create this website. Having learnt Photoshop has
              added to create a Beatuiful website UI and with my CSS & ReactJS
              skills, I was successful in translating that UI into this
              functioning website. If you like this website, then feel free to
              let me know about it. You can send me a message through the
              Contact page.
            </p>
          </Paper>
        </div>
        <div className="site-info">
          <h1>About Titanium Arts</h1>
          <Paper className="paper2" elevation={6}>
            <p>
              I was very much curious about creatives or artwork since I was 13
              and so took part in various school competitions. Then, on the way
              I learnt Photoshop and 3d modelling in Blender. This paved the way
              for my deeper interest in digital creatives. So, I created an
              Instagram page to share my artwork to the world, just as a hobby.
              Then, I came across Web Development and the skill one can learn to
              make beautiful UI websites. I quickly learnt it and created this
              website in order to fulfill my wish to have a website where I can
              portray my artwork. The website is far from perfect, but what is
              perfect? This website is my try to have a good website where
              people enjoy and want to come back again and again.
            </p>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default About;
