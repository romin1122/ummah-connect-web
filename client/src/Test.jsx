import { useState } from 'react';

function Test() {
  const [f, setF] = useState(null);
  console.log(f);
  return (
    <div>
      <input type='file' onChange={(e) => setF(e.target.files[0])} />
      <button onClick={() => console.log(f)}>eff</button>
    </div>
  );
}

export default Test;
