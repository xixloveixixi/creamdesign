import Button, { ButtonType, ButtonSize } from './component/Button/index.tsx';
import Menu from './component/Menu/Menu.tsx';
import MenuItem from './component/Menu/MenuItems.tsx';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="app-container bg-neutral-50 min-h-screen p-4">
      <Menu onSelect={index => console.log(index)} defaultIndex={0}>
        <MenuItem index={0}>Home</MenuItem>
        <MenuItem index={1}>About</MenuItem>
        <MenuItem index={2}>Contact</MenuItem>
      </Menu>
      <h1 className="mb-6">Button Component Examples</h1>

      <div className="mb-6">
        <h2 className="text-lg mb-2">Button Types</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Normal}
            onClick={handleClick}
          >
            Primary Button
          </Button>
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Normal}
            onClick={handleClick}
          >
            Secondary Button
          </Button>
          <Button
            type={ButtonType.Danger}
            size={ButtonSize.Normal}
            onClick={handleClick}
          >
            Danger Button
          </Button>
          <Button
            type={ButtonType.Info}
            size={ButtonSize.Normal}
            onClick={handleClick}
          >
            Info Button
          </Button>
          <Button
            type={ButtonType.Success}
            size={ButtonSize.Normal}
            onClick={handleClick}
          >
            Success Button
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg mb-2">Button Sizes</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleClick} size={ButtonSize.Small}>
            Small
          </Button>
          <Button onClick={handleClick}>Normal</Button>
          <Button onClick={handleClick} size={ButtonSize.Large}>
            Large
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg mb-2">Disabled State</h2>
        <div className="flex flex-wrap gap-3">
          <Button type={ButtonType.Primary} size={ButtonSize.Normal} disabled>
            Disabled Primary
          </Button>
          <Button type={ButtonType.Outline} size={ButtonSize.Normal} disabled>
            Disabled Outline
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
