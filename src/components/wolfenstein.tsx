import * as React from 'react';

interface WolfensteinState {
  isPaused: boolean;
  time: number;
}

enum Button {
  Left = 0,
  Middle = 1,
  Right = 2,
}

interface WolfensteinCanvasProps {
  scale: number;
  width: number;
  height: number;
  pixelRatio: number;
}

export class WolfensteinCanvas extends React.Component<
  WolfensteinCanvasProps,
  WolfensteinState
> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  mouseMoveX: number = 0;
  keys: { [key: string]: boolean } = {};
  buttons: { [key: number]: boolean } = {};

  constructor(props: WolfensteinCanvasProps) {
    super(props);
    this.setup = this.setup.bind(this);
    this.onMouseEvent = this.onMouseEvent.bind(this);
    this.onKeyEvent = this.onKeyEvent.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      isPaused: true,
      time: performance.now(),
    };
  }

  setup() {
    this.canvas.requestPointerLock();
    if (!this.ctx) {
      this.ctx = this.canvas.getContext('2d');
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.imageSmoothingEnabled = false;

      this.ctx.scale(
        this.props.scale * this.props.pixelRatio,
        this.props.scale * this.props.pixelRatio,
      );
    }
    const onPointerLockChange = () => {
      if (document.pointerLockElement === this.canvas) {
        this.setState(
          {
            isPaused: false,
          },
          () => window.requestAnimationFrame(this.tick),
        );
        document.addEventListener('mousemove', this.onMouseEvent, false);
        document.addEventListener('mousedown', this.onMouseEvent);
        document.addEventListener('mouseup', this.onMouseEvent);
        document.addEventListener('keydown', this.onKeyEvent, false);
        document.addEventListener('keyup', this.onKeyEvent, false);
      } else {
        this.setState({
          isPaused: true,
        });
        this.mouseMoveX = 0;
        this.buttons = {};
        this.keys = {};
        document.removeEventListener('mousemove', this.onMouseEvent);
        document.removeEventListener('mousedown', this.onMouseEvent);
        document.removeEventListener('mouseup', this.onMouseEvent);
        document.removeEventListener('keydown', this.onKeyEvent);
        document.removeEventListener('keyup', this.onKeyEvent);
      }
    };
    document.addEventListener('pointerlockchange', onPointerLockChange);
  }

  onMouseEvent(e: MouseEvent) {
    e.preventDefault();
    switch (e.type) {
      case 'mousemove':
        this.mouseMoveX += e.movementX;
        break;
      case 'mousedown':
        this.buttons[e.button] = true;
        break;
      case 'mouseup':
        this.buttons[e.button] = false;
        break;
    }
  }

  onKeyEvent(e: KeyboardEvent) {
    e.preventDefault();
    this.keys[e.key] = e.type === 'keydown';
  }

  tick(time: number) {
    this.setState({
      time,
    });
    if (!this.state.isPaused) {
      window.requestAnimationFrame(this.tick);
    }
  }

  componentWillUnmount() {
    this.mouseMoveX = 0;
    this.buttons = {};
    this.keys = {};
    this.setState({
      isPaused: true,
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <canvas
          id="wolfenstein-viewport"
          ref={c => {
            this.canvas = c;
          }}
          width={this.props.width * this.props.scale * this.props.pixelRatio}
          height={this.props.height * this.props.scale * this.props.pixelRatio}
          style={{
            border: '1px solid black',
            display: 'inline-block',
            height: this.props.height * this.props.scale,
            width: this.props.width * this.props.scale,
          }}
          onClick={this.setup}
        />
        {this.ctx && (
          <Wolfenstein
            context={this.ctx}
            time={this.state.time}
            mouseMoveX={this.mouseMoveX}
            keys={this.keys}
            buttons={this.buttons}
          />
        )}
      </div>
    );
  }
}

interface WolfensteinProps {
  context: CanvasRenderingContext2D;
  time: number;
  mouseMoveX: number;
  keys: { [key: string]: boolean };
  buttons: { [key: number]: boolean };
}

const Wolfenstein = (props: WolfensteinProps) => {
  props.context.fillStyle = 'green';
  props.context.fillRect(0, 0, 320, 120);
  return (
    <div>
      <p>{props.time}</p>
      <p>{props.mouseMoveX}</p>
      <p>{JSON.stringify(props.keys)}</p>
      <p>{JSON.stringify(props.buttons)}</p>
    </div>
  );
};

export default WolfensteinCanvas;
