import Input from './components/Input';

export default function App() {
  return (
    <div style={{ padding: 15 }}>
      <Input
        type="text"
        label="First name"
        iconLeft="Calendar"
        iconRight="Eye"
        placeholder="Test place holder"
        onIconRightClick={() => console.log('clicked')}
        required
        error="Error message here"
      />
    </div>
  );
}
