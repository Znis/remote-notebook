import Docker, { Container, ContainerCreateOptions } from 'dockerode';

const docker = new Docker();
let auxContainer: Container | undefined;

// Function to pull the image
function pull(service: string) {
  return docker.pull(service)
    .then((stream) => {
      return new Promise<void>((resolve, reject) => {
        docker.modem.followProgress(stream, (err: Error | null, output: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
}

// Function to create the container
function create(): Promise<Container> {
  const options: ContainerCreateOptions = {
    Image: 'jupyter/tensorflow-notebook',
    Cmd: ['start-notebook.sh'],
    name: 'docker-notebook',
    HostConfig: {
      CpuCount: 2,
      Memory: 20000 * 1024 * 1024,
      Runtime: 'nvidia', // Use the NVIDIA runtime
      DeviceRequests: [
        {
          Driver: 'nvidia',
          Count: -1, // Allocate all available GPUs
          Capabilities: [['gpu']],
        },
      ],
      PortBindings: {
        '8888/tcp': [
          {
            HostPort: '8888'
          }
        ]
      },
      Binds: [
        'mydata:/home/jovyan/notebooks' // Mount the host directory or volume
      ],
    }
  };

  return docker.createContainer(options)
    .then((container: Container) => {
      auxContainer = container;
      return container;
    });
}

// Function to start, resize, stop, and remove the container
function start(): Promise<void> {
  if (!auxContainer) {
    return Promise.reject(new Error('Container is not created'));
  }

  return auxContainer.start()
    .then(() => {
      console.log('container up');
    });
}

// Execution
pull('jupyter/tensorflow-notebook')
  .then(create)
  .then(start)
  .catch((err: Error) => {
    console.error('Error:', err.message);
  });
