import { JwtPayload, verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

export default function jwtDecode(authHeader: string) {
  const [, token] = authHeader.split(' ');

  const decodedToken = verify(token, jwtConstants.secret) as JwtPayload;

  return {
    userId: decodedToken.sub,
    username: decodedToken.email,
    name: decodedToken.name,
  };
}
