import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(__dirname, '../proto/solver.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const rubiks_solver = protoDescriptor.rubiks_solver;

const client = new rubiks_solver.RubiksSolver(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

export function solveAlgorithmic(cubeState: any): Promise<any> {
  return new Promise((resolve, reject) => {
    client.SolveAlgorithmic({ state: cubeState }, (err: any, response: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
