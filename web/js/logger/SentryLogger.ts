import {ILogger} from './ILogger';

import { init, captureException } from '@sentry/electron';
import {isPresent} from '../Preconditions';
import process from "process";

// This configures the Electron CrashReporter for native app crashes and
// captures any uncaught JavaScript exceptions using the JavaScript SDKs under
// the hood. Be sure to call this function as early as possible in the main
// process and all renderer processes to also catch errors during startup.


export class SentryLogger implements ILogger {

    public readonly name: string = 'sentry-logger';

    public notice(msg: string, ...args: any[]) {
    }

    public warn(msg: string, ...args: any[]) {
    }

    public error(msg: string, ...args: any[]) {

        args.forEach(arg => {

            if ( arg instanceof Error) {

                // This captures 'handles' exceptions as Sentry wouldn't actually
                // capture these as they aren't surfaced to Electron.
                captureException(arg);
            }

        });

    }

    public info(msg: string, ...args: any[]) {
    }

    public verbose(msg: string, ...args: any[]) {
    }

    public debug(msg: string, ...args: any[]) {
    }

    public async sync(): Promise<void> {
        // noop
    }

    public static isEnabled() {
        return !isPresent(process.env['SNAP']);
    }

}

if(SentryLogger.isEnabled()) {
    init({
        dsn: 'https://2e8b8ca6e6bf4bf58d735f2a405ecb20@sentry.io/1273707',
        // more options...
    });
}
