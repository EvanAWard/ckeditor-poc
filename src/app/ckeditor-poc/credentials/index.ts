import { EditorConfig } from 'ckeditor5';

export const LICENSE_KEY =
  'MlVnUUovS1FXVkIxNStvdW9TYUhuQ3I5VmJZYTNCUWdvU25ScWpGbFgxTkJtUExTUzN3ZGRXK2RuNjJrVlE9PS1NakF5TkRFd01UZz0=';

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
export function configUpdateAlert(config: EditorConfig) {
  if ((configUpdateAlert as any).configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (
    currentValue: string | undefined,
    forbiddenValue: string
  ) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  (configUpdateAlert as any).configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'in order to receive full access to the Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    );
  }
}
