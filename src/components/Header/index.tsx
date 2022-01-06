import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import {
  Header,
  Link,
} from './styles';

export default () => (
  <Header>
    Tetris
    <Link
      href="https://github.com/FakeMetalFan/tetris"
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
  </Header>
);
