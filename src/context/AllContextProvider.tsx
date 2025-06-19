import GlobalContextProvider from ".";

const combineComponent = (components: Array<any> = []) => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      return ({ children }: any) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }: any) => <>{children}</>,
  );
};

const contextProviders = [GlobalContextProvider];

const AllContextProvider = combineComponent(contextProviders);

export default AllContextProvider;
