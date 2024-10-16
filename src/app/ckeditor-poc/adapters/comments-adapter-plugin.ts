/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { Plugin } from 'ckeditor5';
import { commentsMock as comments } from '../mock-data';

export class CommentsIntegration extends Plugin {
  static get pluginName() {
    return 'CommentsAdapter';
  }

  static get requires() {
    return ['Users', 'UsersInit', 'CommentsRepository'];
  }

  init() {
    const usersPlugin = this.editor.plugins.get('Users');
    const commentsRepositoryPlugin =
      this.editor.plugins.get('CommentsRepository');

    // Set the adapter to the `Comments#adapter` property.
    commentsRepositoryPlugin.adapter = {
      addComment: (data) => {
        console.log('Comment added', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve({
          commentId: data.commentId,
          createdAt: new Date(), // Should be set server-side.
        });
      },

      updateComment: (data) => {
        console.log('Comment updated', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      removeComment: (data) => {
        console.log('Comment removed', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      addCommentThread(data) {
        console.log('Comment thread added', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve({
          threadId: data.threadId,
          comments: data.comments.map((comment) => ({
            commentId: comment.commentId ?? Math.random().toString(36).slice(2), // quick fix to handle undefined commentId
            createdAt: new Date(),
          })), // Should be set on the server side.
        });
      },

      /**
       * 
       * @param {string} threadId
       * @returns Promise<{
                            threadId: string;
                            comments: Array<CommentData>;
                            resolvedAt?: Date | null;
                            resolvedBy?: string | null;
                            attributes: Record<string, unknown>;
                          } | null>
       */
      getCommentThread: ({ threadId }) => {
        console.log('Get comment thread', threadId);

        // Write a request to your database here. The returned `Promise`
        // should resolve with comment thread data.
        const thread = comments.find(
          (comment) => comment.threadId === threadId
        );
        if (thread) {
          return Promise.resolve({
            ...thread,
            comments: thread.comments.map((comment) => ({
              ...comment,
              createdAt: new Date(comment.createdAt),
            })),
          });
        }
        return Promise.resolve(null);
      },

      updateCommentThread(data) {
        console.log('Comment thread updated', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      resolveCommentThread(data) {
        console.log('Comment thread resolved', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve({
          threadId: data.threadId,
          resolvedAt: new Date(), // Should be set on the server side.
          resolvedBy: usersPlugin.me?.id ?? 'figure this out later', // Should be set on the server side.
        });
      },

      reopenCommentThread(data) {
        console.log('Comment thread reopened', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },

      removeCommentThread(data) {
        console.log('Comment thread removed', data);

        // Write a request to your database here. The returned `Promise`
        // should be resolved when the request has finished.
        return Promise.resolve();
      },
    };
  }
}
