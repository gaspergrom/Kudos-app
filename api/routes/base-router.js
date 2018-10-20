const
    slugify = require('slugify'),
    { Router } = require('express');

module.exports = class BaseRouter {
    constructor(name, pluralName, populateFields, advanced) {
        this.baseClass = require('../models/' + name);
        this.tag = name;
        this.baseRoute = pluralName;
        this.router = Router();

        this.eventListeners = {
            'post': (added) => { }, // params: the newly added entry
            'delete': (deleted) => { }, // params: the deleted entry
            'patch': (original) => { } // params: the original entry before edit,
        };

        this.sortRoutes(populateFields, advanced);
    }

    /**
     * Sets a callback function which will be called when an event is emitted
     * @param {*} event The event to apply the callback to
     * @param {*} callback The callback to call when the event is emitted
     */
    setEventListener(event, callback) {
        if (event in this.eventListeners)
            this.eventListeners[event] = callback;
        else
            console.warn('Tried to add an event listener for a route event that does not exist: \'' + event + '\'.');
    }

    /**
     * Emits an event and calls the appropriate callback function
     * @param {*} event The name of the event to emit
     * @param {*} params Parameters to pass to the callback function
     */
    emitEvent(event, params) {
        if (event in this.eventListeners)
            this.eventListeners[event](params);
        else
            console.warn('Tried to emit a route event that does not exist: \'' + event + '\'.');
    }

    /**
     * Configures all the router routes
     */
    sortRoutes(populateFields, advanced) {
        /**
         * GET - returns all entries of a schema in the database
         * ## returns: all entries in the database of a specific type
         */
        this.router.get('/' + this.baseRoute, (req, res) => {
            let data = this.baseClass.find({});

            if (populateFields)
                for (let i in populateFields)
                    data.populate(populateFields[i]);
            
            data.exec((err, all) => {
                if (err)
                    console.error('Error when fetching all \'' + this.baseRoute + '\': ' + err);
    
                res.json(all);
            })
        });
    
        /**
         * GET by ID - returns a single entry with the specified ID
         * ## params:
         * @ req.params.id (String) - the ID of the entry to return
         * ## returns: the entry with the specified ID (or an empty response if not found)
         */
        this.router.get('/' + this.baseRoute + '/:id', (req, res) => {
            const id = req.params.id;
            let data = this.baseClass.findById(id)
            
            if (populateFields)
                for (let i in populateFields)
                    data.populate(populateFields[i]);
            
            data.exec((err, found) => {
                if (err)
                    console.error('Error when fetching \'' + this.tag + '\' ID ' + id);
    
                res.json(found);
            });
        });
    
        /**
         * POST - adds an entry to the database
         * ## params:
         * @ req.body (Object) - the filled schema of a model to add to the database
         * ## returns: the newly added entry if successful or an empty response if not
         */
        if (advanced !== false) {
            this.router.post('/' + this.baseRoute, (req, res) => {
                if (req.body) {
                    req.body.date = new Date().getTime();

                    if (req.body.title || req.body.name)
                        req.body.slug = req.body.title ? slugify(req.body.title) : slugify(req.body.name);
    
                    this.baseClass.create(req.body, (err, added) => {
                        if (err)
                            console.error('Error when adding new \'' + this.tag + '\': ' + err);
                        else {
                            console.log('Added a \'' + this.tag + '\'.');
                            this.emitEvent('post', added);
                        }
                        
                        res.json(added);
                    });
                }
                else
                    res.json();
            });
        }

        /**
         * PATCH - updates an entry in the database
         * ## params: 
         * @ req.params.id (String): the ID of the entry to update
         * @ req.body (Object): an object with the properties to update
         * ## returns: the original (unedited) entry if successful or an empty response if not
         */
        if (advanced !== false) {
            this.router.patch('/' + this.baseRoute + '/:id', (req, res) => {
                if (req.body) {
                    const id = req.params.id;
                    let data = this.baseClass.findByIdAndUpdate(req.params.id, req.body, { upsert: false });
                    
                    if (req.body.title || req.body.name)
                        req.body.slug = req.body.title ? slugify(req.body.title) : slugify(req.body.name);

                    if (populateFields)
                        for (let i in populateFields)
                            data.populate(populateFields[i]);
                    
                    data.exec((err, original) => {
                        if (err)
                            console.error('Error when patching \'' + this.tag + '\' ID ' + id + ' - problem when updating.');
                        else {
                            console.log('Updated a \'' + this.tag + '\' ID ' + id);
                            this.emitEvent('patch', original);
                        }
    
                        res.json(original);
                    });
                }
                else
                    res.json();
            });
        }
    
        /**
         * DELETE - deletes an entry from the database
         * ## params:
         * @ req.params.id (String): the ID of the entry to delete
         */
        this.router.delete('/' + this.baseRoute + '/:id', (req, res) => {
            this.baseClass.findOneAndDelete({ '_id': req.params.id }, (err, deleted) => {
                if (err)
                    console.error('Error when trying to delete \'' + this.tag + '\' with ID ' + req.params.id + ': ' + err);
                else {
                    console.log('Deleted a \'' + this.tag + '\' ID ' + req.params.id);
                    this.emitEvent('delete', deleted);
                }
                
                res.json(deleted);
            });
        });
    };
};
