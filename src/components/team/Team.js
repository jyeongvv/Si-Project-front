import React from 'react';
import './Team.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const TeamMember = ({ name, title, imageUrl, githubUsername, googleEmail }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3">
    <div className="our-team">
      <div className="picture">
        <img className="img-fluid" src={imageUrl} alt={name} />
      </div>
      <div className="team-content">
        <h3 className="name">{name}</h3>
        <h4 className="title">{title}</h4>
      </div>
      <ul className="social">
        {githubUsername && <li><a href={`https://github.com/${githubUsername}`}><FontAwesomeIcon icon={faGithub} /></a></li>}
        {googleEmail && <li><a href={`mailto:${googleEmail}`}><FontAwesomeIcon icon={faGoogle} /></a></li>}
      </ul>
    </div>
  </div>
);

const TEAM = () => (
  <div className="container">
    <div className="row">
      <TeamMember
        name="김명현"
        title="Front-End Developer"
        imageUrl="https://i.imgur.com/jtXnFZc.png"
        githubUsername="Myun9hyun"
        googleEmail="kimmh970808@gmail.com"
      />
      <TeamMember
        name="김지영"
        title="Full-Stack Developer"
        imageUrl="https://i.imgur.com/JMsCnIc.png"
        githubUsername="jyeongvv"
        googleEmail="kjy812467@gmail.com"
      />
      <TeamMember
        name="김지환"
        title="DB&Data Engineer"
        imageUrl="https://i.imgur.com/1HYkCGk.png"
        githubUsername="zihvvan"
        googleEmail="kimji21758@gmai.com"
      />
      <TeamMember
        name="서동준"
        title="AI&Data Engineer"
        imageUrl="https://i.imgur.com/24drWiS.jpg"
        githubUsername="suhdongjoon"
        googleEmail="tjehdwns97@gmail.com"
      />
      <TeamMember
        name="이재진"
        title="Server&Data Engineer"
        imageUrl="https://i.imgur.com/nHGKu3m.png"
        githubUsername="jaejinLee1215"
        googleEmail="jaejinLee1215@gmail.com"
      />
      <TeamMember
        name="최용재"
        title="Back-End Developer"
        imageUrl="https://i.imgur.com/IzkXOnU.png"
        githubUsername="cc5547"
        googleEmail="dyd5547@gmail.com"
      />
    </div>
  </div>
);

export default TEAM;