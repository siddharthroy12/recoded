import ForkButton from '../ForkButton'

import './index.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <p>Recoded</p>
        <img src="/app_logo.svg" alt="App Logo" className="logo" />
      </div>
      <div className="footer-section">
        <a href="https://siddharthroy.netlify.app/" target="_blank" rel="noreferrer">Made by Siddharth Roy</a>
      </div>
      <div className="footer-section">
        <a href="https://github.com/siddharthroy12/recoder/issues" target="_blank" rel="noreferrer">Submit an issue</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
        </svg>
      </div>
      <div className="footer-section">
        <ForkButton />
      </div>
      <div className="footer-section">
        <a href="https://www.producthunt.com/posts/recoded?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-recoded" rel="noopener" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=355688&theme=dark" alt="Recoded - Create&#0032;beautiful&#0032;images&#0032;and&#0032;videos&#0032;of&#0032;your&#0032;code&#0032;online&#0033; | Product Hunt" style={{width: '150px', height: '54px'}}/></a>
      </div>
    </footer>
  );
}
