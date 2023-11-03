import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();

jest.mock('@react-native-async-storage/async-storage', () => 
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-paper');
