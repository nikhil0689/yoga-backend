interface EntityCtr<T> {
  new (props: T);
}

export abstract class Entity<T> {
  [index: string]: any; // allow proxy getter to work

  /**
   *
   * @param props
   */
  constructor(public readonly props: T) {}

  /**
   * Create a copy of entity with values updated to match those
   * in the provided props
   * Note: Prop keys with no value (undefined) will be ignored. This allows
   * use to just pass DTO properties as props using spread syntax
   * @param props
   * @returns IdentityProvider
   */
  patch(props: Partial<T>): this {
    const mergedProps = Object.keys(props).reduce(
      (merged, key) => {
        // Only overwrite keys that have values
        const value = props[key];
        if (value !== undefined) {
          merged[key] = value;
        }
        return merged;
      },
      { ...this.props },
    );

    const ctr = this.constructor as EntityCtr<T>;
    const clone = new ctr(mergedProps);
    return proxyEntity(clone);
  }

  private static isEntity(v: any): v is Entity<any> {
    return v instanceof Entity;
  }
}

export const proxyEntity = <E extends Entity<unknown>>(entity: E): E => {
  // Cache once for later
  const propKeys = new Set(Object.keys(entity.props));

  return new Proxy(entity, {
    get: function (target: E, property: string) {
      if (propKeys.has(property)) {
        return entity.props[property];
      }
      return Reflect.get(target, property);
    },
  });
};
