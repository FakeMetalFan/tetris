import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';

import * as Styles from './styles';

export default () => (
  <Styles.Header>
    Tetris
    <Styles.Link
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
    </Styles.Link>
  </Styles.Header>
);
