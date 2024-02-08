import { application } from "controllers/application"

import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import ImagesController from "./images_controller"
application.register("images", ImagesController)

import SortablesController from "./sortable_controller"
application.register("sortable", SortablesController)
