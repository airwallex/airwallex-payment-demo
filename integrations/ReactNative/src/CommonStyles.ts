import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    marginVertical: 16,
    borderColor: '#20232a',
    borderRadius: 6,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  alertText: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 15,
    fontFamily: 'Helvetica Neue',
    overflow: 'hidden',
  },
  error: {
    backgroundColor: '#ffebee',
  },
  success: {
    backgroundColor: 'lightgreen',
  },
  webview: {
    margin: 15,
  },
});

export const cssStyles = `
  button {
    margin-top: 15px;
    padding: 2.5px 20px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    background-color: #612fff;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 5px;
    // min-width: 40px;
    min-height: 40px;
  }
  button:disabled {
    opacity: 0.75;
  }
  p {
    margin: 0;
  }
  .field-container {
    margin: 15px 0px;
  }
`;
