/**
 * A map of most DOM event targets to their event maps
 *
 * Taken form https://stackoverflow.com/a/62010854
 */
type DOMEventMapDefinitions = [
    [ AbortSignal, AbortSignalEventMap ],
    [ AbstractWorker, AbstractWorkerEventMap ],
    [ Animation, AnimationEventMap ],
    [ AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap ],
    [ AudioWorkletNode, AudioWorkletNodeEventMap ],
    [ BaseAudioContext, BaseAudioContextEventMap ],
    [ BroadcastChannel, BroadcastChannelEventMap ],
    [ Document, DocumentEventMap ],
    [ Element, ElementEventMap ],
    [ EventSource, EventSourceEventMap ],
    [ FileReader, FileReaderEventMap ],
    [ GlobalEventHandlers, GlobalEventHandlersEventMap ],
    [ HTMLBodyElement, HTMLBodyElementEventMap ],
    [ HTMLElement, HTMLElementEventMap ],
    [ HTMLMediaElement, HTMLMediaElementEventMap ],
    [ IDBDatabase, IDBDatabaseEventMap ],
    [ IDBOpenDBRequest, IDBOpenDBRequestEventMap ],
    [ IDBRequest, IDBRequestEventMap ],
    [ IDBTransaction, IDBTransactionEventMap ],
    [ MediaDevices, MediaDevicesEventMap ],
    [ MediaKeySession, MediaKeySessionEventMap ],
    [ MediaQueryList, MediaQueryListEventMap ],
    [ MediaSource, MediaSourceEventMap ],
    [ MediaStream, MediaStreamEventMap ],
    [ MediaStreamTrack, MediaStreamTrackEventMap ],
    [ MessagePort, MessagePortEventMap ],
    [ Notification, NotificationEventMap ],
    [ OfflineAudioContext, OfflineAudioContextEventMap ],
    [ PaymentRequest, PaymentRequestEventMap ],
    [ Performance, PerformanceEventMap ],
    [ PermissionStatus, PermissionStatusEventMap ],
    [ RTCDTMFSender, RTCDTMFSenderEventMap ],
    [ RTCDataChannel, RTCDataChannelEventMap ],
    [ RTCDtlsTransport, RTCDtlsTransportEventMap ],
    [ RTCIceTransport, RTCIceTransportEventMap ],
    [ RTCPeerConnection, RTCPeerConnectionEventMap ],
    [ RTCSctpTransport, RTCSctpTransportEventMap ],
    [ SVGElement, SVGElementEventMap ],
    [ SVGSVGElement, SVGSVGElementEventMap ],
    [ ScreenOrientation, ScreenOrientationEventMap ],
    [ ServiceWorker, ServiceWorkerEventMap ],
    [ ServiceWorkerContainer, ServiceWorkerContainerEventMap ],
    [ ServiceWorkerRegistration, ServiceWorkerRegistrationEventMap ],
    [ SourceBuffer, SourceBufferEventMap ],
    [ SourceBufferList, SourceBufferListEventMap ],
    [ SpeechSynthesis, SpeechSynthesisEventMap ],
    [ SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap ],
    [ TextTrack, TextTrackEventMap ],
    [ TextTrackCue, TextTrackCueEventMap ],
    [ TextTrackList, TextTrackListEventMap ],
    [ WebSocket, WebSocketEventMap ],
    [ Window, WindowEventMap ],
    [ WindowEventHandlers, WindowEventHandlersEventMap ],
    [ Worker, WorkerEventMap ],
    [ XMLHttpRequest, XMLHttpRequestEventMap ],
    [ XMLHttpRequestEventTarget, XMLHttpRequestEventTargetEventMap ]
];

/*
 * © 2023 Ayub Begimkulov All Rights Reserved
 *
 * As described in https://ayubbegimkulov.com/type-safe-listeners/
 */

/**
 * A list of all event names for the given target
 */
export type EventName<Target extends EventTarget> = CastToName<{
    [K in keyof DOMEventMapDefinitions]: DOMEventMapDefinitions[K] extends [
            infer TargetType,
            infer EventMap
        ]
        ? Target extends TargetType
            ? keyof EventMap
            : never
        : never;
}[keyof DOMEventMapDefinitions]>;

/**
 * The event type for the given target and event name
 */
export type EventType<
    Target extends EventTarget,
    Name extends string
> = CastToEvent<GetEventType_<Target, Name>>;

type GetEventType_<Target extends EventTarget, Name extends string> = {
    [K in keyof DOMEventMapDefinitions]: DOMEventMapDefinitions[K] extends [
            infer TargetType,
            infer EventMap
        ]
        ? Target extends TargetType
            ? Name extends keyof EventMap
                ? EventMap[Name]
                : never
            : never
        : never;
}[keyof DOMEventMapDefinitions];


// if `Target` doesn't match any item form the
// `DOMEventMapDefinitions`, we fallback to Event
type CastToEvent<T> = IsNever<T> extends true ? Event : T;
type CastToName<T> = IsNever<T> extends true ? string : T;

type IsNever<T> = [ T ] extends [ never ] ? true : false;
