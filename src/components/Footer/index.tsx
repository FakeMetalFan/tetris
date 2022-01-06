import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  Footer,
  Link,
} from './styles';

export default () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer>
    <span>
      Powered by
      <Link
        href="https://github.com/FakeMetalFan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={
            [
              'fab',
              'github',
            ]
          }
        />
      </Link>
      &copy;
      <span>
        {currentYear}
      </span>
    </span>
    </Footer>
  );
};
