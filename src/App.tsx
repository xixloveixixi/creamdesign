import { Upload } from './component/Upload/Upload';
import { action } from '@storybook/addon-actions';
function App() {
  return (
    <div style={{ margin: '20px' }}>
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        onSuccess={action('success')}
        onError={action('error')}
        onProgress={action('progress')}
      />
    </div>
  );
}

export default App;
