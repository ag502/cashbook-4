class Observer {
  constructor() {
    this.subscribers = {};
  }

  subscribe = (name, context, cb) => {
    if (!this.subscribers[name]) {
      this.subscribers[name] = [];
    }

    this.subscribers[name].push({
      name,
      context,
      cb,
    });

    console.log(`subscribers`);
    console.log(this.subscribers);
  };

  unsubscribe = (name, context) => {
    this.subscribers[name] = this.subscribers[name].filter(
      ({ context: ctx }) => ctx === context
    );
  };

  notify = (name, data) => {
    this.subscribers[name].forEach(({ cb }) => cb(data));
  };
}

export default new Observer();
