import { Entity, proxyEntity } from 'entity';

export interface AuthProps {
  readonly id: string;
  readonly password: string;
}

export interface Tokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };

export class Authentication extends Entity<AuthProps> {
  private constructor(props: AuthProps) {
    super(props);
  }
  static create(props: AuthProps): Authentication {
    return proxyEntity(new Authentication(props));
  }
}
