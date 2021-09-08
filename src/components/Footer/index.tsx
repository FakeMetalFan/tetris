import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <span>
      Powered by
      <a
        className={styles.link}
        href="https://github.com/FakeMetalFan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={['fab', 'github']} />
      </a>
      &copy;
      <span>{new Date().getFullYear()}</span>
    </span>
  </footer>
);

export default Footer;
