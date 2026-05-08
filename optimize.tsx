import React, { useState, useMemo } from "react";

type User = {
  name: string;
  email: string;
};

const ChildComponent1 = React.memo(() => {
  return (
    <div className="child1">
      <h1>CHILD_1 - {new Date().getTime()}</h1>
    </div>
  );
});

const ChildComponent2 = React.memo(({ user }: { user: User }) => {
  return (
    <div className="child2">
      <h1>CHILD_2 - {new Date().getTime()}</h1>
      <h2>{JSON.stringify(user)}</h2>
    </div>
  );
});

const ChildComponent3 = React.memo(({ num }: { num: number }) => {
  return (
    <div className="child3">
      <h1>CHILD_3 - {new Date().getTime()}</h1>
      <h2>{num}</h2>
    </div>
  );
});

const Optimise = () => {
  const [counter, setCounter] = useState(0);

  const user = useMemo(() => {
    return {
      name: "John",
      email: "j@j.com",
    };
  }, []);

  const num = 5;
  const handleClick = () => {
    setCounter(counter + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>
        INCREMENT
      </button>

      <h1>{counter}</h1>

      <ChildComponent1 />
      <ChildComponent2 user={user} />
      <ChildComponent3 num={num} />
    </div>
  );
};
export default Optimise;

