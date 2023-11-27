/* eslint-disable */
export type Schema = {
  'address': {
    plain: {
      'id': number;
      'created_at': string;
      'city': string;
      'formatted_address': string;
      'latitude': number;
      'longitude': number;
      'country': string;
      'customer': number;
    };
    nested: {};
    flat: {};
  };
  'appointment': {
    plain: {
      'id': number;
      'created_at': string;
      'provider': number;
      'customer': number;
      'date': string;
      'address': number;
    };
    nested: {
      'provider_through_provider': Schema['provider']['plain'] & Schema['provider']['nested'];
      'address_through_address': Schema['address']['plain'] & Schema['address']['nested'];
    };
    flat: {
      'provider_through_provider:id': number;
      'provider_through_provider:created_at': string;
      'provider_through_provider:firstname': string;
      'provider_through_provider:lastname': string;
      'provider_through_provider:phone_number': string;
      'provider_through_provider:is_individual': boolean;
      'provider_through_provider:company_name': string;
      'provider_through_provider:description': string;
      'provider_through_provider:user_id': string;
      'provider_through_provider:financial_id': string;
      'address_through_address:id': number;
      'address_through_address:created_at': string;
      'address_through_address:city': string;
      'address_through_address:formatted_address': string;
      'address_through_address:latitude': number;
      'address_through_address:longitude': number;
      'address_through_address:country': string;
      'address_through_address:customer': number;
    };
  };
  'category': {
    plain: {
      'id': number;
      'created_at': string;
      'title': string;
      'image': string;
      'slug': string;
    };
    nested: {};
    flat: {};
  };
  'customer': {
    plain: {
      'id': number;
      'created_at': string;
      'firstname': string;
      'lastname': string;
      'user_id': string;
      'phone_number': string;
      'financial_id': string;
    };
    nested: {};
    flat: {};
  };
  'order': {
    plain: {
      'id': number;
      'created_at': string;
      'task_provider': number;
      'task': number;
      'updated_at': string;
      'state': string;
      'appointment': number;
      'payment': number;
      'comment': string;
      'provider': number;
      'customer': number;
    };
    nested: {
      'task_provider_through_task_provider': Schema['task_provider']['plain'] & Schema['task_provider']['nested'];
      'task_through_task': Schema['task']['plain'] & Schema['task']['nested'];
      'appointment_through_appointment': Schema['appointment']['plain'] & Schema['appointment']['nested'];
      'payment_through_payment': Schema['payment']['plain'] & Schema['payment']['nested'];
      'provider_through_provider': Schema['provider']['plain'] & Schema['provider']['nested'];
      'customer_through_customer': Schema['customer']['plain'] & Schema['customer']['nested'];
    };
    flat: {
      'task_provider_through_task_provider:id': number;
      'task_provider_through_task_provider:created_at': string;
      'task_provider_through_task_provider:provider': number;
      'task_provider_through_task_provider:task': number;
      'task_provider_through_task_provider:price': number;
      'task_provider_through_task_provider:min_estimated_cost': number;
      'task_provider_through_task_provider:max_estimated_cost': number;
      'task_provider_through_task_provider:payable_in_advance': boolean;
      'task_provider_through_task_provider:provider_through_provider:id': number;
      'task_provider_through_task_provider:provider_through_provider:created_at': string;
      'task_provider_through_task_provider:provider_through_provider:firstname': string;
      'task_provider_through_task_provider:provider_through_provider:lastname': string;
      'task_provider_through_task_provider:provider_through_provider:phone_number': string;
      'task_provider_through_task_provider:provider_through_provider:is_individual': boolean;
      'task_provider_through_task_provider:provider_through_provider:company_name': string;
      'task_provider_through_task_provider:provider_through_provider:description': string;
      'task_provider_through_task_provider:provider_through_provider:user_id': string;
      'task_provider_through_task_provider:provider_through_provider:financial_id': string;
      'task_provider_through_task_provider:task_through_task:id': number;
      'task_provider_through_task_provider:task_through_task:created_at': string;
      'task_provider_through_task_provider:task_through_task:name': string;
      'task_provider_through_task_provider:task_through_task:recommended_price': number;
      'task_provider_through_task_provider:task_through_task:service': number;
      'task_provider_through_task_provider:task_through_task:is_hourly_price': boolean;
      'task_provider_through_task_provider:task_through_task:service_through_service:id': number;
      'task_provider_through_task_provider:task_through_task:service_through_service:created_at': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:title': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:category': number;
      'task_provider_through_task_provider:task_through_task:service_through_service:image': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:slug': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:category_through_category:id': number;
      'task_provider_through_task_provider:task_through_task:service_through_service:category_through_category:created_at': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:category_through_category:title': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:category_through_category:image': string;
      'task_provider_through_task_provider:task_through_task:service_through_service:category_through_category:slug': string;
      'task_through_task:id': number;
      'task_through_task:created_at': string;
      'task_through_task:name': string;
      'task_through_task:recommended_price': number;
      'task_through_task:service': number;
      'task_through_task:is_hourly_price': boolean;
      'task_through_task:service_through_service:id': number;
      'task_through_task:service_through_service:created_at': string;
      'task_through_task:service_through_service:title': string;
      'task_through_task:service_through_service:category': number;
      'task_through_task:service_through_service:image': string;
      'task_through_task:service_through_service:slug': string;
      'task_through_task:service_through_service:category_through_category:id': number;
      'task_through_task:service_through_service:category_through_category:created_at': string;
      'task_through_task:service_through_service:category_through_category:title': string;
      'task_through_task:service_through_service:category_through_category:image': string;
      'task_through_task:service_through_service:category_through_category:slug': string;
      'appointment_through_appointment:id': number;
      'appointment_through_appointment:created_at': string;
      'appointment_through_appointment:provider': number;
      'appointment_through_appointment:customer': number;
      'appointment_through_appointment:date': string;
      'appointment_through_appointment:address': number;
      'appointment_through_appointment:provider_through_provider:id': number;
      'appointment_through_appointment:provider_through_provider:created_at': string;
      'appointment_through_appointment:provider_through_provider:firstname': string;
      'appointment_through_appointment:provider_through_provider:lastname': string;
      'appointment_through_appointment:provider_through_provider:phone_number': string;
      'appointment_through_appointment:provider_through_provider:is_individual': boolean;
      'appointment_through_appointment:provider_through_provider:company_name': string;
      'appointment_through_appointment:provider_through_provider:description': string;
      'appointment_through_appointment:provider_through_provider:user_id': string;
      'appointment_through_appointment:provider_through_provider:financial_id': string;
      'appointment_through_appointment:address_through_address:id': number;
      'appointment_through_appointment:address_through_address:created_at': string;
      'appointment_through_appointment:address_through_address:city': string;
      'appointment_through_appointment:address_through_address:formatted_address': string;
      'appointment_through_appointment:address_through_address:latitude': number;
      'appointment_through_appointment:address_through_address:longitude': number;
      'appointment_through_appointment:address_through_address:country': string;
      'appointment_through_appointment:address_through_address:customer': number;
      'payment_through_payment:id': number;
      'payment_through_payment:created_at': string;
      'payment_through_payment:updated_at': string;
      'payment_through_payment:state': string;
      'payment_through_payment:method': string;
      'provider_through_provider:id': number;
      'provider_through_provider:created_at': string;
      'provider_through_provider:firstname': string;
      'provider_through_provider:lastname': string;
      'provider_through_provider:phone_number': string;
      'provider_through_provider:is_individual': boolean;
      'provider_through_provider:company_name': string;
      'provider_through_provider:description': string;
      'provider_through_provider:user_id': string;
      'provider_through_provider:financial_id': string;
      'customer_through_customer:id': number;
      'customer_through_customer:created_at': string;
      'customer_through_customer:firstname': string;
      'customer_through_customer:lastname': string;
      'customer_through_customer:user_id': string;
      'customer_through_customer:phone_number': string;
      'customer_through_customer:financial_id': string;
    };
  };
  'payment': {
    plain: {
      'id': number;
      'created_at': string;
      'updated_at': string;
      'state': string;
      'method': string;
    };
    nested: {};
    flat: {};
  };
  'provider': {
    plain: {
      'id': number;
      'created_at': string;
      'firstname': string;
      'lastname': string;
      'phone_number': string;
      'is_individual': boolean;
      'company_name': string;
      'description': string;
      'user_id': string;
      'financial_id': string;
    };
    nested: {};
    flat: {};
  };
  'review': {
    plain: {
      'id': number;
      'created_at': string;
      'provider': number;
      'customer': number;
      'comment': string;
      'rating': number;
    };
    nested: {
      'provider_through_provider': Schema['provider']['plain'] & Schema['provider']['nested'];
      'customer_through_customer': Schema['customer']['plain'] & Schema['customer']['nested'];
    };
    flat: {
      'provider_through_provider:id': number;
      'provider_through_provider:created_at': string;
      'provider_through_provider:firstname': string;
      'provider_through_provider:lastname': string;
      'provider_through_provider:phone_number': string;
      'provider_through_provider:is_individual': boolean;
      'provider_through_provider:company_name': string;
      'provider_through_provider:description': string;
      'provider_through_provider:user_id': string;
      'provider_through_provider:financial_id': string;
      'customer_through_customer:id': number;
      'customer_through_customer:created_at': string;
      'customer_through_customer:firstname': string;
      'customer_through_customer:lastname': string;
      'customer_through_customer:user_id': string;
      'customer_through_customer:phone_number': string;
      'customer_through_customer:financial_id': string;
    };
  };
  'service': {
    plain: {
      'id': number;
      'created_at': string;
      'title': string;
      'category': number;
      'image': string;
      'slug': string;
    };
    nested: {
      'category_through_category': Schema['category']['plain'] & Schema['category']['nested'];
    };
    flat: {
      'category_through_category:id': number;
      'category_through_category:created_at': string;
      'category_through_category:title': string;
      'category_through_category:image': string;
      'category_through_category:slug': string;
    };
  };
  'task': {
    plain: {
      'id': number;
      'created_at': string;
      'name': string;
      'recommended_price': number;
      'service': number;
      'is_hourly_price': boolean;
    };
    nested: {
      'service_through_service': Schema['service']['plain'] & Schema['service']['nested'];
    };
    flat: {
      'service_through_service:id': number;
      'service_through_service:created_at': string;
      'service_through_service:title': string;
      'service_through_service:category': number;
      'service_through_service:image': string;
      'service_through_service:slug': string;
      'service_through_service:category_through_category:id': number;
      'service_through_service:category_through_category:created_at': string;
      'service_through_service:category_through_category:title': string;
      'service_through_service:category_through_category:image': string;
      'service_through_service:category_through_category:slug': string;
    };
  };
  'task_provider': {
    plain: {
      'id': number;
      'created_at': string;
      'provider': number;
      'task': number;
      'price': number;
      'min_estimated_cost': number;
      'max_estimated_cost': number;
      'payable_in_advance': boolean;
    };
    nested: {
      'provider_through_provider': Schema['provider']['plain'] & Schema['provider']['nested'];
      'task_through_task': Schema['task']['plain'] & Schema['task']['nested'];
    };
    flat: {
      'provider_through_provider:id': number;
      'provider_through_provider:created_at': string;
      'provider_through_provider:firstname': string;
      'provider_through_provider:lastname': string;
      'provider_through_provider:phone_number': string;
      'provider_through_provider:is_individual': boolean;
      'provider_through_provider:company_name': string;
      'provider_through_provider:description': string;
      'provider_through_provider:user_id': string;
      'provider_through_provider:financial_id': string;
      'task_through_task:id': number;
      'task_through_task:created_at': string;
      'task_through_task:name': string;
      'task_through_task:recommended_price': number;
      'task_through_task:service': number;
      'task_through_task:is_hourly_price': boolean;
      'task_through_task:service_through_service:id': number;
      'task_through_task:service_through_service:created_at': string;
      'task_through_task:service_through_service:title': string;
      'task_through_task:service_through_service:category': number;
      'task_through_task:service_through_service:image': string;
      'task_through_task:service_through_service:slug': string;
      'task_through_task:service_through_service:category_through_category:id': number;
      'task_through_task:service_through_service:category_through_category:created_at': string;
      'task_through_task:service_through_service:category_through_category:title': string;
      'task_through_task:service_through_service:category_through_category:image': string;
      'task_through_task:service_through_service:category_through_category:slug': string;
    };
  };
};
