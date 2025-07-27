export default function TestPage({ params }: { params: { testId: string } }) {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Test ID: {params.testId}</p>
    </div>
  );
}
